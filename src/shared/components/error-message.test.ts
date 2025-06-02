import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';

import { createErrorMessage } from './error-message';

const ERROR_MESSAGE = 'Test message';

describe('createErrorMessage', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const parent = document.createElement('div');
    createErrorMessage(ERROR_MESSAGE, parent);
    document.body.append(parent);
  });

  it('creates error message container', () => {
    const div = screen.getByTestId('error-message');

    expect(div).toBeInstanceOf(HTMLDivElement);
    expect(div).toBeTruthy();
    expect(div.textContent).toBe(ERROR_MESSAGE);
  });
});
