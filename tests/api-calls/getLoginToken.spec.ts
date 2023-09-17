import { base } from '@faker-js/faker'
import { test, expect } from '@playwright/test'


    test.describe.configure({mode:"parallel"})
    const baseUrl = 'https://reqres.in/api'

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`)
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.data.first_name).toBe("Emma");
        expect(responseBody.data.email).toBeTruthy();
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404);
    })

    test("Post Request - Create a new user", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                id: 101,
                Name: "Ataure",
            }
        })

        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(201);
        expect(responseBody.createdAt).toBeTruthy();
    })

    test("Post Request - login", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.token).toBeTruthy();
        const token = responseBody.token
        expect(token).toBe("QpwL5tke4Pnpja7X4");
    })

    test("Post Request - login Failed", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
            }
        })

        expect(response.status()).toBe(400);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.error).toBeTruthy();
        expect(responseBody.error).toBe("Missing password");
    })

    test("PUT Request - updae the existing user", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                "name": "New User",
                "job": "Updated Job"
            }
        })

        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200)
        expect(responseBody.data.name).toBe("New User");
        expect(responseBody.data.job).toBe("Updated Job");
    })

