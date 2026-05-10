# PlanMyKerala

PlanMyKerala is a Next.js application designed to help users plan their trips to Kerala, India. The application features a high-conversion landing page and a dynamic itinerary builder component, allowing users to create and manage their travel itineraries seamlessly.

## Features

- **High-Conversion Landing Page**: Engaging hero section with a search widget and trust signals to encourage user interaction.
- **Dynamic Itinerary Builder**: An interactive interface for users to create, modify, and save their travel itineraries.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive user experience.

## Getting Started

To get started with the PlanMyKerala project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd PlanMyKerala
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` to view the application.

## Project Structure

The project is organized as follows:

```
PlanMyKerala
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx                     # High-conversion landing page
│   │   ├── itinerary
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                 # Dynamic itinerary builder route
│   │   └── api
│   │       └── itinerary
│   │           └── route.ts             # Server API for saving/loading itineraries
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── CTA.tsx
│   │   ├── ItineraryBuilder.tsx         # Dynamic itinerary builder component
│   │   └── ItineraryCard.tsx
│   ├── hooks
│   │   └── useItinerary.ts
│   ├── lib
│   │   └── apiClient.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
└── README.md
```

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Lucide React**: A collection of customizable icons for React applications.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.