import { describe, it, expect, test, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('UI test', () => {
  it('create div and append in document', () => {
    const div = document.createElement('div');
    div.textContent = 'Hi!';
    document.body.append(div);

    const element = document.querySelector('div');
    expect(element?.textContent).toBe('Hi!');
  });
});

const dom = new JSDOM(` <!DOCTYPE html><p>Привет, мир</p> `);
console.log(dom);
// console.log(dom.window.document.querySelector("p").textContent);

function createGreeting(name: string): HTMLDivElement {
  // Create a new div element
  const div = document.createElement('div');

  // Set the text content of the div
  div.textContent = `Hello, ${name}!`;

  // Add a CSS class to the div
  div.className = 'greeting';

  // Append the div to the document body
  document.body.append(div);

  // Return the created element
  return div;
}

// Set up a fresh DOM before each test
beforeEach(() => {
  // Create a new JSDOM instance with a basic HTML structure
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

  // Set the global document and window objects to use the JSDOM instance
  globalThis.document = dom.window.document;
  globalThis.window = dom.window;
});

test('createGreeting adds a greeting to the DOM', () => {
  // Clear the body content before the test
  document.body.innerHTML = '';

  // Act: Call the createGreeting function
  const element = createGreeting('Vitest');

  // Assert: Check if the greeting text is correct
  expect(element.textContent).toBe('Hello, Vitest!');

  // Assert: Check if the correct CSS class is applied
  expect(element.className).toBe('greeting');

  // Assert: Check if the element is actually in the document body
  expect(document.body.contains(element)).toBe(true);
});
