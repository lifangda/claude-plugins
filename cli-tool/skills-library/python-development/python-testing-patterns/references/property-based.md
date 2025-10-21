# Property-Based Testing

Property-based testing with Hypothesis for automatic test case generation.

## Basic Property Testing

```python
# test_properties.py
from hypothesis import given, strategies as st
import pytest

def reverse_string(s: str) -> str:
    """Reverse a string."""
    return s[::-1]

@given(st.text())
def test_reverse_twice_is_original(s):
    """Property: reversing twice returns original."""
    assert reverse_string(reverse_string(s)) == s

@given(st.text())
def test_reverse_length(s):
    """Property: reversed string has same length."""
    assert len(reverse_string(s)) == len(s)
```

## Numeric Properties

```python
@given(st.integers(), st.integers())
def test_addition_commutative(a, b):
    """Property: addition is commutative."""
    assert a + b == b + a

@given(st.integers())
def test_addition_identity(a):
    """Property: adding zero doesn't change value."""
    assert a + 0 == a

@given(st.lists(st.integers()))
def test_sorted_list_properties(lst):
    """Property: sorted list is ordered."""
    sorted_lst = sorted(lst)

    # Same length
    assert len(sorted_lst) == len(lst)

    # All elements present
    assert set(sorted_lst) == set(lst)

    # Is ordered
    for i in range(len(sorted_lst) - 1):
        assert sorted_lst[i] <= sorted_lst[i + 1]
```

## Custom Strategies

```python
from hypothesis import strategies as st

# Custom email strategy
email_strategy = st.builds(
    lambda name, domain: f"{name}@{domain}.com",
    name=st.text(min_size=1, max_size=20, alphabet=st.characters(whitelist_categories=('Ll',))),
    domain=st.text(min_size=1, max_size=15, alphabet=st.characters(whitelist_categories=('Ll',)))
)

@given(email_strategy)
def test_email_format(email):
    """Test email format property."""
    assert "@" in email
    assert email.endswith(".com")
```
