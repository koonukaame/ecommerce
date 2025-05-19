import { describe, it, expect, vi, beforeEach } from 'vitest';
import { router } from './router';
import { appState } from '../app-state';
import { Page } from '../constants';

import * as handlers from './handlers';
import * as render from './render-page';

describe('router', () => {
  beforeEach(() => {
    appState.currentPage = Page.main;
    appState.isLogined = false;
    globalThis.location.hash = '';
    vi.restoreAllMocks();
  });

  it('renderPage should update hash with login', () => {
    const mockPage = Page.login;

    vi.spyOn(handlers, 'checkRenderPage').mockReturnValue(mockPage);

    const renderPageSpy = vi.spyOn(render, 'renderPage').mockImplementation(() => {});

    router();

    globalThis.location.hash = `#${mockPage}`;
    globalThis.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(appState.currentPage).toBe(mockPage);
    expect(renderPageSpy).toHaveBeenCalledWith(mockPage);
    expect(globalThis.location.hash).toBe(`#${mockPage}`);
  });
});
