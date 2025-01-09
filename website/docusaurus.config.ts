import { themes as prismThemes } from 'prism-react-renderer';
import { Config } from '@docusaurus/types';
import { Options, ThemeConfig } from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

export default {
  title: '@kcuf-ui',
  tagline: 'A very easy to use React UI library',
  favicon: 'img/favicon.png',
  url: 'https://your-docusaurus-site.example.com', // Set the production url of your site here
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'justnewbee', // Usually your GitHub org / username.
  projectName: '@kcuf-ui', // Usually your repo name.
  
  plugins: [
    'docusaurus-plugin-sass',
    'docusaurus-lunr-search',
    ['docusaurus-plugin-typedoc', {
      entryPoints: [
        '../packages-ui/rc-backdrop-headless/src/index.ts'
      ]
    }]
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  
  presets: [
    ['classic', {
      docs: {
        sidebarPath: './sidebars.ts',
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
      },
      blog: {
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true
        },
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // Useful options to enforce blogging best practices
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn'
      },
      theme: {
        customCss: [
          './src/css/var.scss',
          './src/css/custom.scss'
        ]
      }
    } satisfies Options]
  ],
  
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '@kcuf-ui',
      logo: {
        alt: '@kcuf-ui',
        src: 'img/logo.svg'
      },
      items: [{
        type: 'docSidebar',
        sidebarId: 'tutor',
        position: 'left',
        label: 'Tutorial'
      }, {
        type: 'docSidebar',
        sidebarId: 'component',
        position: 'left',
        label: 'Component'
      }, {
        to: '/blog',
        label: 'Blog',
        position: 'left'
      }, {
        href: 'https://github.com/agrawal-rohit/pearl-ui',
        position: 'right',
        className: 'header-github-link',
        'aria-label': 'GitHub repository'
      }]
    },
    footer: {
      style: 'dark',
      links: [{
        title: 'Docs',
        items: [{
          label: 'Tutorial',
          to: '/docs/tutor/intro'
        }]
      }, {
        title: 'Community',
        items: [{
          label: 'Stack Overflow',
          href: 'https://stackoverflow.com/questions/tagged/docusaurus'
        }, {
          label: 'Discord',
          href: 'https://discordapp.com/invite/docusaurus'
        }, {
          label: 'X',
          href: 'https://x.com/docusaurus'
        }]
      }, {
        title: 'More',
        items: [{
          label: 'Blog',
          to: '/blog'
        }, {
          label: 'GitHub',
          href: 'https://github.com/facebook/docusaurus'
        }]
      }],
      copyright: `Copyright &copy; ${new Date().getFullYear()} NB, Inc. Built with Docusaurus.`
    },
    
    prism: {
      theme: prismThemes.shadesOfPurple,
      darkTheme: prismThemes.shadesOfPurple
    },
    
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn'
  } satisfies ThemeConfig
} satisfies Config;
