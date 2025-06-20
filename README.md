# Good Neighbors - Disaster Recovery Coordination Platform

A minimum viable product (MVP) web application that unifies disaster recovery organizations and volunteers, providing real-time, cross-agency matching of volunteers to verified needs.

## 🎯 Mission

Connect verified needs with skilled volunteers in real-time to make a difference when it matters most. Our platform addresses the inefficiencies of fragmented coordination, poor onboarding, and lack of real-time matching while ensuring accessibility and inclusion from day one.

## ✨ Core Features

### 1. Centralized Needs Dashboard
- Organizations post verified needs (tasks, locations, required skills, urgency)
- Needs are tagged with location, time, and resource requirements
- Publicly visible list/map of all active needs

### 2. Volunteer Portal
- Quick sign-up with basic info, skills, and location
- Option to register as affiliated or spontaneous volunteer
- Dashboard showing nearby needs/tasks matching skills and availability
- One-click "volunteer now" for urgent or unfilled tasks

### 3. Real-Time Matching Engine
- Automatically matches volunteers to needs based on skills, proximity, and urgency
- Dynamic updates as new needs or volunteers are added

### 4. Rapid Onboarding & Credentialing
- Short, in-app training modules for spontaneous volunteers
- Digital badges/certificates issued upon completion
- Option for organizations to verify/approve volunteers

### 5. Organization Admin Panel
- Register and manage organization profile
- Post, edit, and close needs
- View volunteer responses and communicate directly
- Analytics: real-time status of needs, volunteer engagement, and fulfillment rates

### 6. Communication Tools
- In-app messaging between volunteers and coordinators
- Automated notifications for task assignments, updates, and urgent needs

### 7. Accessibility & Inclusion
- Multilingual interface (English, Spanish, French)
- Mobile-friendly, low-bandwidth design
- Simple, high-contrast UI for accessibility

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd good-neighbors
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🏗️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Internationalization**: i18next
- **State Management**: React Context API
- **Styling**: Emotion (CSS-in-JS)

## 📱 User Flows

### Volunteer Flow
1. Visit site → Sign up (name, contact, skills, location)
2. Complete quick training (if unaffiliated)
3. See nearby needs → Click to volunteer
4. Get assignment and instructions

### Organization Flow
1. Register organization
2. Post needs (task, location, skills, urgency)
3. Review volunteer matches
4. Communicate with volunteers
5. Mark needs as fulfilled

## 🎨 Design Principles

- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile Responsive**: Works seamlessly on all devices
- **Low Bandwidth**: Optimized for areas with limited connectivity
- **High Contrast**: Clear visual hierarchy and readability
- **Multilingual**: Support for multiple languages from day one

## 📊 Validation Metrics

- Number of needs posted and fulfilled
- Number of volunteers registered and matched
- Time from posting need to fulfillment
- Volunteer and organization feedback

## 🔮 Future Enhancements

- Advanced GIS and AI-based resource allocation
- Open API for third-party integration
- SMS/voice interface for low-connectivity users
- Deep analytics and reporting
- Long-term recovery tracking

## 🤝 Contributing

This is an MVP focused on core functionality. Future contributions will be welcome once the basic platform is stable and deployed.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

Built with the goal of improving disaster response coordination and making volunteerism more effective and accessible.

---

**Good Neighbors** - Uniting communities in times of need.
