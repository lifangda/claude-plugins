#!/usr/bin/env python3
"""
USPTO Trademark API Helper

Provides functions for searching and retrieving trademark data using USPTO
Trademark Status & Document Retrieval (TSDR) API.

Requires:
    - requests library: pip install requests
    - USPTO API key from https://account.uspto.gov/api-manager/

Environment variables:
    USPTO_API_KEY - Your USPTO API key
"""

import os
import sys
import json
import requests
from typing import Dict, List, Optional, Any


class TrademarkClient:
    """Client for USPTO Trademark APIs."""

    TSDR_BASE_URL = "https://tsdrapi.uspto.gov/ts/cd"
    ASSIGNMENT_BASE_URL = "https://assignment-api.uspto.gov/trademark"

    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize client with API key.

        Args:
            api_key: USPTO API key (if not provided, uses USPTO_API_KEY env var)
        """
        self.api_key = api_key or os.getenv("USPTO_API_KEY")
        if not self.api_key:
            raise ValueError("API key required. Set USPTO_API_KEY environment variable or pass to constructor.")

        self.headers = {"X-Api-Key": self.api_key}

    def get_trademark_by_serial(self, serial_number: str) -> Optional[Dict]:
        """
        Get trademark information by serial number.

        Args:
            serial_number: Trademark serial number (e.g., "87654321")

        Returns:
            Trademark data dictionary or None if not found
        """
        url = f"{self.TSDR_BASE_URL}/casedocs/sn{serial_number}/info.json"

        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                return None
            raise

    def get_trademark_by_registration(self, registration_number: str) -> Optional[Dict]:
        """
        Get trademark information by registration number.

        Args:
            registration_number: Trademark registration number (e.g., "5678901")

        Returns:
            Trademark data dictionary or None if not found
        """
        url = f"{self.TSDR_BASE_URL}/casedocs/rn{registration_number}/info.json"

        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                return None
            raise

    def get_trademark_status(self, serial_or_registration: str) -> Dict[str, Any]:
        """
        Get current status summary for a trademark.

        Args:
            serial_or_registration: Serial or registration number

        Returns:
            Status summary dictionary with:
                - mark_text: Text of the mark
                - status: Current status
                - filing_date: Application filing date
                - registration_number: Registration number if registered
                - registration_date: Registration date if registered
        """
        # Try serial number first
        data = self.get_trademark_by_serial(serial_or_registration)

        # If not found, try registration number
        if not data:
            data = self.get_trademark_by_registration(serial_or_registration)

        if not data:
            return {}

        tm = data.get('TradeMarkAppln', {})

        return {
            'mark_text': tm.get('MarkVerbalElementText'),
            'status': tm.get('MarkCurrentStatusExternalDescriptionText'),
            'status_date': tm.get('MarkCurrentStatusDate'),
            'filing_date': tm.get('ApplicationDate'),
            'application_number': tm.get('ApplicationNumber'),
            'registration_number': tm.get('RegistrationNumber'),
            'registration_date': tm.get('RegistrationDate'),
            'mark_drawing_code': tm.get('MarkDrawingCode'),
            'is_registered': tm.get('RegistrationNumber') is not None
        }

    def get_goods_and_services(self, serial_or_registration: str) -> List[Dict]:
        """
        Get goods and services classification for a trademark.

        Args:
            serial_or_registration: Serial or registration number

        Returns:
            List of goods/services entries with classes
        """
        data = self.get_trademark_by_serial(serial_or_registration)
        if not data:
            data = self.get_trademark_by_registration(serial_or_registration)

        if not data:
            return []

        tm = data.get('TradeMarkAppln', {})
        return tm.get('GoodsAndServices', [])

    def get_owner_info(self, serial_or_registration: str) -> List[Dict]:
        """
        Get owner/applicant information for a trademark.

        Args:
            serial_or_registration: Serial or registration number

        Returns:
            List of owner entries
        """
        data = self.get_trademark_by_serial(serial_or_registration)
        if not data:
            data = self.get_trademark_by_registration(serial_or_registration)

        if not data:
            return []

        tm = data.get('TradeMarkAppln', {})
        return tm.get('Owners', [])

    def get_prosecution_history(self, serial_or_registration: str) -> List[Dict]:
        """
        Get prosecution history for a trademark.

        Args:
            serial_or_registration: Serial or registration number

        Returns:
            List of prosecution events
        """
        data = self.get_trademark_by_serial(serial_or_registration)
        if not data:
            data = self.get_trademark_by_registration(serial_or_registration)

        if not data:
            return []

        tm = data.get('TradeMarkAppln', {})
        return tm.get('ProsecutionHistoryEntry', [])

    def check_trademark_health(self, serial_or_registration: str) -> Dict[str, Any]:
        """
        Check trademark health and identify issues.

        Args:
            serial_or_registration: Serial or registration number

        Returns:
            Health check dictionary with alerts and status
        """
        status = self.get_trademark_status(serial_or_registration)

        if not status:
            return {'error': 'Trademark not found'}

        current_status = status.get('status', '').upper()
        alerts = []

        # Check for problematic statuses
        if 'ABANDON' in current_status:
            alerts.append('⚠️  ABANDONED - Mark is no longer active')
        elif 'CANCELLED' in current_status:
            alerts.append('⚠️  CANCELLED - Registration cancelled')
        elif 'EXPIRED' in current_status:
            alerts.append('⚠️  EXPIRED - Registration has expired')
        elif 'SUSPENDED' in current_status:
            alerts.append('⏸️  SUSPENDED - Examination suspended')
        elif 'PUBLISHED' in current_status:
            alerts.append('📢 PUBLISHED - In opposition period')
        elif 'REGISTERED' in current_status:
            alerts.append('✅ ACTIVE - Mark is registered and active')
        elif 'PENDING' in current_status:
            alerts.append('⏳ PENDING - Application under examination')

        return {
            'mark': status.get('mark_text'),
            'status': current_status,
            'status_date': status.get('status_date'),
            'alerts': alerts,
            'needs_attention': len([a for a in alerts if '⚠️' in a]) > 0
        }


def main():
    """Command-line interface for trademark search."""
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python trademark_client.py <serial_or_registration_number>")
        print("  python trademark_client.py --status <number>")
        print("  python trademark_client.py --health <number>")
        print("  python trademark_client.py --goods <number>")
        sys.exit(1)

    client = TrademarkClient()

    try:
        if sys.argv[1] == "--status":
            result = client.get_trademark_status(sys.argv[2])
        elif sys.argv[1] == "--health":
            result = client.check_trademark_health(sys.argv[2])
        elif sys.argv[1] == "--goods":
            result = client.get_goods_and_services(sys.argv[2])
        else:
            # Get full trademark data
            result = client.get_trademark_by_serial(sys.argv[1])
            if not result:
                result = client.get_trademark_by_registration(sys.argv[1])

        if result:
            print(json.dumps(result, indent=2))
        else:
            print(f"Trademark {sys.argv[1]} not found", file=sys.stderr)
            sys.exit(1)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
