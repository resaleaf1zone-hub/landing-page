import { Handler } from '@netlify/functions';

const subscribers: string[] = [];

const subscribe: Handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const { email } = JSON.parse(event.body || '');

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid email address' }),
            };
        }

        // Store the email
        if (!subscribers.includes(email)) {
            subscribers.push(email);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Subscription successful' }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
    };
};

export const handler = subscribe;