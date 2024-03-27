export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API",
            version: "1.0.0",
            description: "API de una ecommerce estado beta"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development local server"
            },
            {
                url: "https://api-ecommerce-beta-dev-qkxd.2.us-1.fl0.io",
                description: "Production server"
            },
        ],
    },
    apis: ["./src/docs/*.yml"],
}