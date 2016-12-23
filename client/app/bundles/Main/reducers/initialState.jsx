let loggedIn = ('true' == localStorage.getItem( 'isLoggedIn')) || false
export default {
	holidays: [],
	leave_types: [],
	leave_requests: [],
	active_request: {},
	authUser: { isLoggedIn: loggedIn,
              userData: null
            },
	profile_reducer: { pofile: {}, leave_counts: {}, user: {}}
};
