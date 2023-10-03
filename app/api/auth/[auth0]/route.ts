import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';


export const GET = handleAuth({
    login: handleLogin({
        returnTo: '/userHome',
        authorizationParams: {
            audience: 'http://localhost:8081'
        }
    }),
    logout: handleLogout({
        returnTo: '/home',
    })
});