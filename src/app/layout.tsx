"use client";
import { createGlobalStyle } from "styled-components";
import { NavStateProvider } from "./lib/navState";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2')
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  html {
    --lime: #DAF7A6;
    --green: #839464;
    --darkGreen: #444d34;
    --yellow: #FFC300;
    --darkYellow: #554100;
    --orange: #FF5733;
    --darkOrange: #551d11;
    --red: #C70039;
    --burgundy: #900C3F;
    --purple: #581845;
    --black: #393939;
    --gray: #3a3a3a;
    --grey: var(--gray);
    --lightGray: #e1e1e1;
    --lightGrey: var(--lightGray);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 62.5%; // 10px
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    color: var(--black);
  }
  
  textarea {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  .required {
    color: var(--orange);
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NavStateProvider>
        <GlobalStyles />
        <body>{children}</body>
      </NavStateProvider>
    </html>
  );
}
