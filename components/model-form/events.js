// FIXME: Hi stranger. Let me introduce to you one silly but required hack.
// It was a long way. A lot of adventures. At first it was little but cute frontend.
// Components were lonely. But they were strong. Huge amount of source code. Every component had ability to
// do everything you want.
// The only thing they didn't know - hard time was coming.
// Amount of components were growing, they copied abilities of each other, they had to protect themselves
// from the growing functionality.
//
// One day every component became so powerful that it couldn't handle so much power.
// But they realized - we shouldn't handle it in lonelinnes.
// Together we are stronger. Together we can share functionality between each other.
// REDUX CAME
// WEB OF POWER CONNECTED THEM ALL
// ONE CONTEXT FOR EVERY COMPONENT
// ON REDUCER FOR EVERY APP
// But sometimes, there were some nomads. They didn't want to use global context. They wanted to be alone.
// Params table actually one of them.
// But hard times dictate rules.
// They had to give hand of help to another components.
// The only thing that didn't give them to fall into the web of global context was lack of time.
// So they had to use
// secret weapon
//
// GEPPETTO events.
//
// Some day they will connect to other components into strong system.
// But hard times dictate rules.
//
//
// We should move this to global redux context, events are temporarily implementation.

export const TOGGLE_ALL = "toggle_all";
export const UNTOGGLE_ALL = "untoggle_all";
export const ADDED = "added";
export const REMOVED = "removed";