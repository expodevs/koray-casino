# Tabs Component

A reusable and flexible tabs component for React applications.

## Features

- Simple and intuitive API
- Fully customizable styling
- Context-based state management
- TypeScript support

## Installation

The components are already installed in the project. Import them from:

```jsx
import { TabContainer, Tab, TabContent } from '@components/Tabs';
```

## Usage

### Basic Example

```jsx
import { TabContainer, Tab, TabContent } from '@components/Tabs';

function MyComponent() {
  return (
    <TabContainer defaultTab="tab1" className="my-tabs">
      {/* Tab Headers */}
      <div className="flex space-x-4 border-b border-gray-200">
        <Tab id="tab1" label="Tab 1" />
        <Tab id="tab2" label="Tab 2" />
        <Tab id="tab3" label="Tab 3" />
      </div>

      {/* Tab Content */}
      <div className="p-4">
        <TabContent id="tab1">
          <div>Content for Tab 1</div>
        </TabContent>
        
        <TabContent id="tab2">
          <div>Content for Tab 2</div>
        </TabContent>
        
        <TabContent id="tab3">
          <div>Content for Tab 3</div>
        </TabContent>
      </div>
    </TabContainer>
  );
}
```

## Components

### TabContainer

The main container component that manages the tab state.

#### Props

- `children`: React nodes to be rendered inside the container
- `defaultTab`: The ID of the tab that should be active by default
- `className`: Optional CSS class name for styling

### Tab

A component for rendering a tab header.

#### Props

- `id`: Unique identifier for the tab
- `label`: Text or React node to display as the tab label
- `className`: Optional CSS class name for the base tab style
- `activeClassName`: Optional CSS class name for the active tab state
- `inactiveClassName`: Optional CSS class name for the inactive tab state

### TabContent

A component for rendering tab content that is conditionally displayed based on the active tab.

#### Props

- `id`: Unique identifier for the tab content (should match a tab's ID)
- `children`: React nodes to be rendered when this tab is active
- `className`: Optional CSS class name for styling
