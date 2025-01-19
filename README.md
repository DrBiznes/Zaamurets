# Zaamurets

![ZaamuretsGif](https://github.com/user-attachments/assets/f6981c9e-7541-46d8-ae32-eaa3d1a7bb46)


A React component library for creating ASCII art trains with support for shields.io badges and custom content. Create animated armored trains with shields.io badges for use in your projects. I use react-fast-marquee to animate it but do whatever floats your train.

![Zaamurets](https://github.com/user-attachments/assets/3265fd19-0c74-44e3-a0ea-26d6385815be)

## Installation

```bash
npm install zaamurets
```

## Quick Start

```jsx
import { Train, TrainCar } from 'zaamurets';
import Marquee from 'react-fast-marquee';

// With scrolling animation
function Example() {
  return (
    <Marquee speed={20}>
      <Train>
        <TrainCar>
          <img src="https://img.shields.io/badge/build-passing-brightgreen" />
        </TrainCar>
      </Train>
    </Marquee>
  );
}

// With track animation
function AnotherExample() {
  return (
    <Train animated={true}>
      <TrainCar>
        <img src="https://img.shields.io/badge/build-passing-brightgreen" />
      </TrainCar>
    </Train>
  );
}
```

## Features

- ASCII art trains with engine, cars, and caboose
- Native support for shields.io badges
- Animated track effects (alternating track pattern)
- Clickable train cars with custom content
- TypeScript support
- Zero dependencies other than React

## Documentation

### Train Component

Main container component for creating an ASCII train.

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | TrainCar components to be rendered |
| `additionalTrackSegments` | `number` | `0` | Add extra track segments after the train |
| `animated` | `boolean` | `false` | Enable track pattern animation (alternates between `-+-` and `+-+` patterns) |

### TrainCar Component

Individual car components that make up the train.

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode \| BadgeConfig[]` | `undefined` | Content to display in the car |
| `href` | `string` | `undefined` | Makes the entire car clickable with this URL |

### Types

```typescript
interface BadgeConfig {
  src: string;      // URL of the badge image
  href?: string;    // Optional click URL for the badge
  alt?: string;     // Optional alt text for the badge
}
```

## Usage Examples

### Basic Badge Display

```jsx
import { Train, TrainCar } from 'zaamurets';

function BasicExample() {
  return (
    <Train>
      <TrainCar>
        <img src="https://img.shields.io/badge/build-passing-brightgreen" />
      </TrainCar>
    </Train>
  );
}
```

### Multiple Badges in One Car

```jsx
import { Train, TrainCar } from 'zaamurets';

function MultiBadgeExample() {
  const badges = [
    {
      src: "https://img.shields.io/badge/tests-passing-green",
      href: "https://example.com/tests",
      alt: "Tests Status"
    },
    {
      src: "https://img.shields.io/badge/coverage-98%25-brightgreen",
      href: "https://example.com/coverage",
      alt: "Coverage Status"
    }
  ];

  return (
    <Train>
      <TrainCar>{badges}</TrainCar>
    </Train>
  );
}
```

### Animated Track Example

```jsx
import { Train, TrainCar } from 'zaamurets';

function AnimatedTrackExample() {
  return (
    <Train animated={true} additionalTrackSegments={10}>
      <TrainCar>
        <img src="https://img.shields.io/badge/status-running-blue" />
      </TrainCar>
    </Train>
  );
}
```

### Clickable Car with Custom Content

```jsx
import { Train, TrainCar } from 'zaamurets';

function ClickableExample() {
  return (
    <Train>
      <TrainCar href="https://github.com/yourusername/yourrepo">
        <div className="flex items-center gap-2">
          <span>Star on GitHub</span>
        </div>
      </TrainCar>
    </Train>
  );
}
```

## API Guidelines

### Badge Limitations

Each train car is limited to a maximum of 2 badges to ensure proper display and readability.

### Performance Considerations

- The `animated` prop creates an interval timer to animate the track pattern. Use it sparingly in performance-critical applications
- Consider the total number of cars when implementing in production
- Ensure custom content is sized appropriately for car dimensions

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer is not supported

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Jamino](https://github.com/DrBiznes)

## Related Projects

- [react-fast-marquee](https://www.npmjs.com/package/react-fast-marquee) - For animated train movement
- [shields.io](https://shields.io/) - For generating badges

## Support

For support, issues, or feature requests, please file an issue in the [GitHub repository](https://github.com/DrBiznes/zaamurets/issues).
