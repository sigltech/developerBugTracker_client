import { fetchBaseQuery, createApi, selectToken } from '@reduxjs/toolkit/query/react';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5050/api',
        prepareHeaders: (headers, { getState }) => {
            const token = selectToken(getState());
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        }),
        getTickets: builder.query({
            query: () => '/tickets'
        }),
        getTicket: builder.query({
            query: (id) => `/tickets/${id}`
        }),
        createTicket: builder.mutation({
            query: (body) => ({
                url: '/tickets',
                method: 'POST',
                body
            })
        }),
        updateTicket: builder.mutation({
            query: (body) => ({
                url: `/tickets/${body.id}`,
                method: 'PUT',
                body
            })
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({
                url: `/tickets/${id}`,
                method: 'DELETE'
            })
        })
    })
});


