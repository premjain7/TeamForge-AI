// Requirement agent
export const analyzePrompt = async (prompt) => {
    const text = prompt.toLowerCase();

    let project = {
        title: "Custom Software Project",
        type: "Web Application",
        complexity: "Medium",
        estimatedDuration: "8 weeks"
    };

    let requirements = {
        roles: [],
        skills: [],
        technologies: []
    };

    // AI / Chatbot
    if (text.includes("ai") || text.includes("chatbot")) {
        project.type = "AI Application";
        project.complexity = "High";
        project.estimatedDuration = "12 weeks";

        requirements = {
            roles: [
                "AI Engineer",
                "Backend Developer",
                "Frontend Developer"
            ],
            skills: [
                "Machine Learning",
                "REST APIs",
                "Prompt Engineering"
            ],
            technologies: [
                "React",
                "Node.js",
                "Gemini API"
            ]
        };
    }

    // Ecommerce
    else if (
        text.includes("ecommerce") ||
        text.includes("e-commerce") ||
        text.includes("shopping")
    ) {
        project.type = "E-Commerce Platform";
        project.complexity = "High";
        project.estimatedDuration = "10 weeks";

        requirements = {
            roles: [
                "Frontend Developer",
                "Backend Developer",
                "UI/UX Designer"
            ],
            skills: [
                "Payments",
                "Authentication",
                "Database Design"
            ],
            technologies: [
                "React",
                "Express",
                "MongoDB",
                "Stripe"
            ]
        };
    }

    // Mobile App
    else if (
        text.includes("mobile") ||
        text.includes("android") ||
        text.includes("ios")
    ) {
        project.type = "Mobile Application";
        project.complexity = "Medium";
        project.estimatedDuration = "8 weeks";

        requirements = {
            roles: [
                "Mobile Developer",
                "Backend Developer",
                "UI/UX Designer"
            ],
            skills: [
                "Mobile UI",
                "API Integration"
            ],
            technologies: [
                "React Native",
                "Node.js",
                "Firebase"
            ]
        };
    }

    // Default
    else {
        requirements = {
            roles: [
                "Frontend Developer",
                "Backend Developer"
            ],
            skills: [
                "Web Development"
            ],
            technologies: [
                "React",
                "Node.js"
            ]
        };
    }

    return {
        project,
        requirements
    };
};