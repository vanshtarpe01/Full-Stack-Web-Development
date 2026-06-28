const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design Login Page",
        taskDescription: "Create a responsive login page UI.",
        taskDate: "2026-06-15",
        category: "Design"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fix Navbar Bug",
        taskDescription: "Resolve alignment issue in navbar.",
        taskDate: "2026-06-16",
        category: "Frontend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Create Footer",
        taskDescription: "Build reusable footer component.",
        taskDate: "2026-06-10",
        category: "Frontend"
      }
    ]
  },

  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Setup Database",
        taskDescription: "Configure MySQL database schema.",
        taskDate: "2026-06-17",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "API Authentication",
        taskDescription: "Implement JWT authentication.",
        taskDate: "2026-06-11",
        category: "Backend"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Payment Gateway",
        taskDescription: "Integrate payment gateway API.",
        taskDate: "2026-06-12",
        category: "Backend"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Write API Docs",
        taskDescription: "Document all REST endpoints.",
        taskDate: "2026-06-18",
        category: "Documentation"
      }
    ]
  },

  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Dashboard UI",
        taskDescription: "Build admin dashboard interface.",
        taskDate: "2026-06-15",
        category: "Frontend"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Dark Mode Feature",
        taskDescription: "Implement dark mode support.",
        taskDate: "2026-06-08",
        category: "Frontend"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Chart Integration",
        taskDescription: "Integrate analytics charts.",
        taskDate: "2026-06-09",
        category: "Frontend"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Profile Screen",
        taskDescription: "Create employee profile page.",
        taskDate: "2026-06-20",
        category: "UI/UX"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Notification Panel",
        taskDescription: "Develop notification center.",
        taskDate: "2026-06-21",
        category: "Frontend"
      }
    ]
  },

  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Testing Login Flow",
        taskDescription: "Perform login functionality testing.",
        taskDate: "2026-06-15",
        category: "QA"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Regression Testing",
        taskDescription: "Run regression test suite.",
        taskDate: "2026-06-07",
        category: "QA"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Performance Testing",
        taskDescription: "Analyze application performance.",
        taskDate: "2026-06-09",
        category: "QA"
      }
    ]
  },

  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Deploy Application",
        taskDescription: "Deploy latest build to production.",
        taskDate: "2026-06-16",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Configure CI/CD",
        taskDescription: "Setup GitHub Actions workflow.",
        taskDate: "2026-06-05",
        category: "DevOps"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Monitor Servers",
        taskDescription: "Check server health and logs.",
        taskDate: "2026-06-17",
        category: "DevOps"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Kubernetes Migration",
        taskDescription: "Migrate services to Kubernetes.",
        taskDate: "2026-06-10",
        category: "Cloud"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Backup Database",
        taskDescription: "Create automated backup jobs.",
        taskDate: "2026-06-18",
        category: "Database"
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123"
  }
];

export const setLocalStorage =()=>{
    localStorage.setItem("empolyees", JSON.stringify(employees));
    localStorage.setItem("admin", JSON.stringify(admin));
}
export const getLocalStorage =()=>{
    const employees = JSON.parse(localStorage.getItem('empolyees'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    return {employees, admin};
}