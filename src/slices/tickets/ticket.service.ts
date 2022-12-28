import API from "../../lib/API"

type getParams = {
    page: number,
    size: number
}

/**
 * Creates a ticket
 * @param {object} payload 
 * @returns 
 */
export const createTicket = async (payload: any) => {
    return await (await API.post("/tickets", payload)).data;
}

/**
 * 
 * @param {object} params 
 * @param {int} params.page
 * @param {int} params.size The amount of document
 * @returns 
 */
export const fetchTickets = async (params: getParams) => {
    return (await API.get('/tickets', { params: { page: params.page ?? 1, size: params.size ?? 10 }})).data
}

/**
 * Get a single ticket
 * @param id 
 * @returns 
 */
export const getTicket = async (id: string) => {
    return (await API.get(`/tickets/${id}`)).data
}

const ticketService = { createTicket, fetchTickets, getTicket };

export default ticketService;