import {
  afterEach
} from 'vitest';

import { cleanup } from '@testing-library/react/pure';

afterEach(() => {
  cleanup();
});
