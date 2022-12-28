import CreateTicket from "../pages/app/CreateTicket";
import Ticket from "../pages/app/Ticket";
import Tickets from "../pages/app/Tickets";

const protectedRoutes: any = [
    {
        path: '/tickets',
        element: <Tickets />
    },
    {
        path: '/tickets/:id',
        element: <Ticket />
    },
    {
        path: '/new-ticket',
        element: <CreateTicket />
    }
];

export default protectedRoutes;
