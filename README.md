# Pokémon App

This is a Pokémon information web application built using **React** and **TypeScript**. It fetches data from the [PokéAPI](https://pokeapi.co/), allowing users to view Pokémon details, navigate through paginated lists, and interact with an intuitive and responsive interface.

## Features

-   **Pokémon List:** View a paginated list of Pokémon with their names and images.
-   **Pokémon Details:** Click on any Pokémon to see detailed information including stats, abilities, and type.
-   **Persistent Data:** Previously fetched Pokémon pages are cached to avoid redundant API requests when navigating backward.
-   **Error Handling:** Graceful error handling with custom error components in case of failed API requests.
-   **Loading States:** Loading indicators are shown while data is being fetched from the API.

## Tech Stack

-   **React** (UI Library)
-   **TypeScript** (For type safety)
-   **Axios** (API requests)
-   **ESLint & Prettier** (For code quality and formatting)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Hytsigo/pokeapi-v2.git

    ```

2. Navigate to the project directory:

    ```bash
    cd pokeapi-v2

    ```

3. Install the dependencies:

    ```bash
    npm install

    ```

4. Run the application:

    ```bash
    npm run dev
    ```
