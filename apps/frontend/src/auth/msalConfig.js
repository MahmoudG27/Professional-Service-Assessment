import { PublicClientApplication } from "@azure/msal-browser";
const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID;
if (!clientId) {
    console.warn("VITE_ENTRA_CLIENT_ID is not set. Authentication will not work until it is configured.");
}
const msalConfig = {
    auth: {
        clientId: clientId ?? "",
        //  authority: `https://login.microsoftonline.com/${import.meta.env.VITE_ENTRA_TENANT_ID}`,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",
    },
};
export const msalInstance = new PublicClientApplication(msalConfig);
export const loginRequest = {
    scopes: ["User.Read"],
};
