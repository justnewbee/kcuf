import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

const linkCommon = css`
  transition: all ease-in-out 0.3s;
  
  &:link {
    text-decoration: none;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

export const mixinLinkDisabled = css`
  &,
  &:link,
  &:visited,
  &:hover,
  &:focus,
  &:active {
    color: var(--kcuf-color-link-disabled, ${COLOR.LINK_DISABLED});
    text-decoration: none;
    cursor: default;
  }
`;
export const mixinLinkPrimary = css`
  color: var(--kcuf-color-link-primary, ${COLOR.LINK_PRIMARY});
  ${linkCommon};
  
  &:visited {
    color: var(--kcuf-color-link-primary-visited, ${COLOR.LINK_PRIMARY_VISITED});
  }
  
  &:hover,
  &:focus {
    color: var(--kcuf-color-link-primary-hover, ${COLOR.LINK_PRIMARY_HOVER});
  }
  
  &:active {
    color: var(--kcuf-color-link-primary-active, ${COLOR.LINK_PRIMARY_ACTIVE});
  }
`;
export const mixinLinkSecondary = css`
  color: var(--kcuf-color-link-secondary, ${COLOR.LINK_SECONDARY});
  ${linkCommon};
  
  &:visited {
    color: var(--kcuf-color-link-secondary-visited, ${COLOR.LINK_SECONDARY_VISITED});
  }
  
  &:hover,
  &:focus {
    color: var(--kcuf-color-link-secondary-hover, ${COLOR.LINK_SECONDARY_HOVER});
  }
  
  &:active {
    color: var(--kcuf-color-link-secondary-active, ${COLOR.LINK_SECONDARY_ACTIVE});
  }
`;
export const mixinLinkTertiary = css`
  color: var(--kcuf-color-link-tertiary, ${COLOR.LINK_TERTIARY});
  ${linkCommon};
  
  &:visited {
    color: var(--kcuf-color-link-tertiary-visited, ${COLOR.LINK_TERTIARY_VISITED});
  }
  
  &:hover,
  &:focus {
    color: var(--kcuf-color-link-tertiary-hover, ${COLOR.LINK_TERTIARY_HOVER});
  }
  
  &:active {
    color: var(--kcuf-color-link-tertiary-active, ${COLOR.LINK_TERTIARY_ACTIVE});
  }
`;
