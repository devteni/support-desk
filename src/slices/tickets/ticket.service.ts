import API from "../../lib/API"

type getParams = {
    page?: number,
    size?: number
}

type getNotesParams = getParams & { ticketId: string };

type createNotePayload = {
    ticketId: string;
    text: string;
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
 * Adds a note to a ticket
 * @param {object} payload 
 * @returns 
 */
export const createNote = async (payload: createNotePayload) => {
    return await (await API.post("/notes", payload)).data;
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
 * 
 * @param {object} params 
 * @param {int} params.page
 * @param {int} params.size The amount of document
 * @returns 
 */
export const getNotes = async (params: getNotesParams) => {
    return (await API.get('/notes', { params: { ticket_id: params.ticketId, page: params.page ?? 1, size: params.size ?? 10 }})).data
}

/**
 * Get a single ticket
 * @param id 
 * @returns 
 */
export const getTicket = async (id: string) => {
    return (await API.get(`/tickets/${id}`)).data
}

/**
 * Close a ticket
 * @param id 
 * @returns 
 */
export const closeTicket = async (id: string) => {
    return (await API.put(`/tickets/${id}`, { status: 'closed' })).data
}

const ticketService = { createTicket, createNote, fetchTickets, getTicket, closeTicket, getNotes };

export default ticketService;