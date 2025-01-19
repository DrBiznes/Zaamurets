# Zaamurets Demo Site

Demo website for the Zaamurets React component library, showcasing ASCII art trains with shields.io badges.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run deploy   # Gh-pages deploy
```

## CSS Notes

The train containers require specific styling to display correctly:
- Use `overflow: visible` on container elements
- Don't override the train's internal margins
- Use padding instead of margins on containers
- Keep monospace font settings intact

## Dependencies

- React
- Vite
- TypeScript
- react-fast-marquee
- html2canvas
- zaamurets
- Prism Syntax Highlighter

## License

MIT © Jamino
