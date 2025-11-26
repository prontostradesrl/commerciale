// ========================================
// NAVBAR COMPONENT - Da includere in tutte le pagine
// ========================================
// Uso: <script src="navbar-component.js"></script> dopo React
// Poi: <div id="navbar-root"></div> e ReactDOM.render(<Navbar />, document.getElementById('navbar-root'))

const Navbar = ({ userEmail }) => {
    const [currentPage, setCurrentPage] = React.useState('');
    const [showUserMenu, setShowUserMenu] = React.useState(false);
    
    React.useEffect(() => {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        setCurrentPage(path);
    }, []);
    
    const navItems = [
        { label: 'Analisi', href: 'app-kml-manual.html', icon: '📊', color: 'blue' },
        { label: 'Importazione', href: 'sync_intelligente_firebase.html', icon: '🔄', color: 'green' },
        { label: 'Convenzioni', href: 'gestione_convenzioni.html', icon: '📋', color: 'purple' },
        { label: 'Centri', href: 'gestione_centri.html', icon: '🏢', color: 'orange' }
    ];
    
    const isActive = (href) => currentPage === href;
    
    const handleLogout = async () => {
        if (confirm('Sei sicuro di voler uscire?')) {
            try {
                await firebase.auth().signOut();
                window.location.href = 'login.html';
            } catch (error) {
                alert('Errore logout: ' + error.message);
            }
        }
    };
    
    return React.createElement('nav', {
        className: 'bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg sticky top-0 z-50'
    },
        React.createElement('div', {
            className: 'container mx-auto px-3 sm:px-4'
        },
            React.createElement('div', {
                className: 'flex items-center justify-between h-14 sm:h-16'
            },
                // Logo/Brand
                React.createElement('div', {
                    className: 'flex items-center space-x-2'
                },
                    React.createElement('span', { className: 'text-2xl' }, '🚗'),
                    React.createElement('span', {
                        className: 'text-white font-bold text-sm sm:text-lg hidden sm:block'
                    }, 'Pronto Strade Manager')
                ),
                
                // Navigation Links - Desktop e Mobile
                React.createElement('div', {
                    className: 'flex items-center space-x-1'
                },
                    navItems.map(item =>
                        React.createElement('a', {
                            key: item.href,
                            href: item.href,
                            className: `px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1
                                ${isActive(item.href) 
                                    ? 'bg-white text-indigo-700 shadow-md' 
                                    : 'text-white hover:bg-indigo-500'
                                }`
                        },
                            React.createElement('span', { className: 'text-base sm:text-lg' }, item.icon),
                            React.createElement('span', { 
                                className: 'hidden lg:inline'
                            }, item.label)
                        )
                    ),
                    
                    // User Menu
                    React.createElement('div', { 
                        className: 'relative ml-2 sm:ml-4'
                    },
                        React.createElement('button', {
                            onClick: () => setShowUserMenu(!showUserMenu),
                            className: 'flex items-center space-x-2 px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition text-white'
                        },
                            React.createElement('span', { className: 'text-lg' }, '👤'),
                            React.createElement('span', { 
                                className: 'hidden md:inline text-sm max-w-[150px] truncate'
                            }, userEmail || 'Utente')
                        ),
                        
                        // Dropdown Menu
                        showUserMenu && React.createElement('div', {
                            className: 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50'
                        },
                            React.createElement('div', {
                                className: 'px-4 py-2 border-b border-gray-200'
                            },
                                React.createElement('p', {
                                    className: 'text-xs text-gray-500'
                                }, 'Connesso come:'),
                                React.createElement('p', {
                                    className: 'text-sm font-medium text-gray-900 truncate'
                                }, userEmail)
                            ),
                            React.createElement('button', {
                                onClick: handleLogout,
                                className: 'w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition'
                            }, '🚪 Esci')
                        )
                    )
                )
            )
        )
    );
};

// Helper function per montare la navbar
window.mountNavbar = (userEmail = '') => {
    const navbarRoot = document.getElementById('navbar-root');
    if (navbarRoot && typeof ReactDOM !== 'undefined') {
        ReactDOM.render(
            React.createElement(Navbar, { userEmail }),
            navbarRoot
        );
    }
};
