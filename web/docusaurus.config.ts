import {
  themes as prismThemes
} from 'prism-react-renderer';

import {
  Config
} from '@docusaurus/types';
import {
  Options,
  ThemeConfig
} from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

export default {
  title: 'kcuf-ui',
  tagline: 'A very easy to use React UI library',
  favicon: 'favicon.ico',
  url: 'https://kcuf-ui.com', // Set the production url of your site here
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true // Improve compatibility with the upcoming Docusaurus v4
  },
  
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'justnewbee', // Usually your GitHub org/username
  projectName: 'kcuf', // Usually your repo name
  
  plugins: [
    'docusaurus-plugin-sass',
    'docusaurus-plugin-image-zoom',
    ['docusaurus-lunr-search', {
      languages: ['en', 'zh']
    }]
  ],
  
  themes: [
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-mermaid'
  ],
  
  markdown: {
    mermaid: true
  },
  
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh']
  },
  
  presets: [
    ['classic', {
      docs: {
        sidebarPath: './sidebars.ts',
        // sidebarCollapsible: false,
        sidebarCollapsed: false,
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true
      },
      blog: {
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true
        },
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // Useful options to enforce blogging best practices
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn'
      },
      theme: {
        customCss: [
          './src/css/var.scss',
          './src/css/custom-common.scss',
          './src/css/custom-markdown.scss',
          './src/css/custom-site-header.scss',
          './src/css/custom-site-footer.scss',
          './src/css/custom-sidebar.scss',
          './src/css/custom-toc.scss',
          './src/css/custom-live-editor.scss'
        ]
      }
    } satisfies Options]
  ],
  
  themeConfig: {
    // image: 'img/social-card.jpg', // Project's social card
    navbar: {
      title: 'kcuf-ui',
      logo: {
        alt: 'kcuf-ui',
        src: 'img/logo.png'
      },
      items: [{
        label: 'Guide',
        position: 'left',
        type: 'docSidebar',
        sidebarId: 'guide'
      }, {
        label: 'Component',
        position: 'left',
        type: 'docSidebar',
        sidebarId: 'component'
      }, {
        label: 'Blog',
        position: 'left',
        to: '/blog'
      }, {
        label: 'Tutorial',
        position: 'right',
        type: 'docSidebar',
        sidebarId: 'tutor'
      }, {
        href: 'https://github.com/justnewbee/kcuf',
        position: 'right',
        className: 'header-github-link',
        'aria-label': 'GitHub repository'
      }]
    },
    
    footer: {
      // links: [{
      //   title: 'Docs',
      //   items: [{
      //     label: 'Tutorial',
      //     to: '/docs/tutor'
      //   }]
      // }, {
      //   title: 'Community',
      //   items: [{
      //     label: 'Stack Overflow',
      //     href: 'https://stackoverflow.com/questions/tagged/docusaurus'
      //   }, {
      //     label: 'Discord',
      //     href: 'https://discordapp.com/invite/docusaurus'
      //   }, {
      //     label: 'X',
      //     href: 'https://x.com/docusaurus'
      //   }]
      // }, {
      //   title: 'More',
      //   items: [{
      //     label: 'Blog',
      //     to: '/blog'
      //   }, {
      //     label: 'GitHub',
      //     href: 'https://github.com/facebook/docusaurus'
      //   }]
      // }],
      copyright: `Copyright &copy; ${new Date().getFullYear()} NB, Inc. Built with Docusaurus.`
    },
    
    prism: {
      theme: prismThemes.nightOwl,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash']
    },
    
    liveCodeBlock: {
      playgroundPosition: 'top' // or 'bottom'
    },
    
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark'
      },
      // https://mermaid.js.org/config/theming.html#available-themes
      options: {}
    },
    
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'hsl(0 0% 100% / 75%)',
        dark: 'hsl(0 0% 20% / 75%)'
      },
      // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      config: {}
    },
    
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn'
  } satisfies ThemeConfig
} satisfies Config;
