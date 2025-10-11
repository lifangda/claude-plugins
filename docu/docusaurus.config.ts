import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Claude Code Templates',
  tagline: 'Documentation for Claude Code Templates - AITMPL Platform',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://github.com/lifangda/claude-plugins',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain deployment
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lifangda', // Usually your GitHub org/user name.
  projectName: 'claude-plugins', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // GitHub Pages deployment configuration
  trailingSlash: false,
  
  // Add plugin to create .nojekyll file automatically
  plugins: [
    function createNojekyllPlugin() {
      return {
        name: 'create-nojekyll',
        async postBuild({ outDir }) {
          const fs = require('fs');
          const path = require('path');
          const nojekyllPath = path.join(outDir, '.nojekyll');
          fs.writeFileSync(nojekyllPath, '');
          console.log('✅ Created .nojekyll file for GitHub Pages');
        },
      };
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/lifangda/claude-plugins/tree/main/docu/',
        },
        blog: false, // Disable blog functionality
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card for sharing
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Claude Code Templates',
      logo: {
        alt: 'AITMPL Crystal Ball Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/lifangda/claude-plugins/',
          label: 'Browse Components',
          position: 'left',
        },
        {
          href: 'https://github.com/lifangda/claude-plugins',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Browse Components',
              href: 'https://github.com/lifangda/claude-plugins/',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/lifangda/claude-plugins',
            },
            {
              label: 'Issues & Support',
              href: 'https://github.com/lifangda/claude-plugins/issues',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contribute',
              href: 'https://github.com/lifangda/claude-plugins/blob/main/CONTRIBUTING.md',
            },
            {
              label: 'License',
              href: 'https://github.com/lifangda/claude-plugins/blob/main/LICENSE',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Claude Code Templates. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
