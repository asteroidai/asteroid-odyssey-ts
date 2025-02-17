/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The type of supervisor. ClientSupervisor means that the supervision is done client side and the server is merely informed. Other supervisor types are handled serverside, e.g. HumanSupervisor means that a human will review the request via the Asteroid UI.
 */
export enum SupervisorType {
    CLIENT_SUPERVISOR = 'client_supervisor',
    HUMAN_SUPERVISOR = 'human_supervisor',
    NO_SUPERVISOR = 'no_supervisor',
}
