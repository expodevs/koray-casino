
const apiRoutes = {
    builders: '/api/admin/builders',
    users: '/api/admin/users',
    settings: '/api/admin/settings',
    pages: '/api/admin/pages',
    options: '/api/admin/options',
    casinos: '/api/admin/casinos',
    casinoOptions: '/api/admin/casinoOptions',
    menus: '/api/admin/menus',
    faqs: '/api/admin/faqs',
    categoryCards: '/api/admin/categoryCards',
    iconCards: '/api/admin/iconCards',
    iconCardImages: '/api/admin/iconCardImages',
    cards: '/api/admin/cards',
};

const pagesRoutes = {
    users: '/admin/users',
    settings: '/admin/settings',
    pages: '/admin/pages',
    options: '/admin/options',
    casinos: '/admin/casinos',
    casinoOptions: '/admin/casinoOptions',
    menus: '/admin/menus',
    faqs: '/admin/faqs',
    categoryCards: '/admin/categoryCards',
    iconCards: '/admin/iconCards',
    iconCardImages: '/admin/iconCardImages',
    cards: '/admin/cards',
};

const routeAdminApiBuilders = {
    all: apiRoutes.builders
};

const routeAdminApiUsers = {
    all: apiRoutes.users,
    one: (id: string): string => `${apiRoutes.users}/${id}`,
};

const routeAdminPageUsers = {
    all: pagesRoutes.users,
    create: `${pagesRoutes.users}/create`,
    edit: (id: string): string => `${pagesRoutes.users}/${id}/edit`,
};

const routeAdminApiSettings = {
    all: apiRoutes.settings,
    one: (id: string): string => `${apiRoutes.settings}/${id}`,
};

const routeAdminPageSettings = {
    all: pagesRoutes.settings,
    create: `${pagesRoutes.settings}/create`,
    edit: (id: string): string => `${pagesRoutes.settings}/${id}/edit`,
};

const routeAdminApiPages = {
    all: apiRoutes.pages,
    one: (id: string): string => `${apiRoutes.pages}/${id}`,
};

const routeAdminPagePages = {
    all: pagesRoutes.pages,
    create: `${pagesRoutes.pages}/create`,
    edit: (id: string): string => `${pagesRoutes.pages}/${id}/edit`,
};

const routeAdminApiOptions = {
    all: apiRoutes.options,
    one: (id: string): string => `${apiRoutes.options}/${id}`,
};

const routeAdminPageOptions = {
    all: pagesRoutes.options,
    create: `${pagesRoutes.options}/create`,
    edit: (id: string): string => `${pagesRoutes.options}/${id}/edit`,
};

const routeAdminApiCasinos = {
    all: apiRoutes.casinos,
    pageBuilder: `${apiRoutes.casinos}/pageBuilder`,
    one: (id: string): string => `${apiRoutes.casinos}/${id}`,
};

const routeAdminPageCasinos = {
    all: pagesRoutes.casinos,
    create: `${pagesRoutes.casinos}/create`,
    edit: (id: string): string => `${pagesRoutes.casinos}/${id}/edit`,
};

const routeAdminApiCasinoOptions = {
    all: apiRoutes.casinoOptions,
    list: `${apiRoutes.casinoOptions}/all`,
    one: (id: string): string => `${apiRoutes.casinoOptions}/${id}`,
};

const routeAdminPageCasinoOptions = {
    all: pagesRoutes.casinoOptions,
    create: `${pagesRoutes.casinoOptions}/create`,
    edit: (id: string): string => `${pagesRoutes.casinoOptions}/${id}/edit`,
};

const routeAdminApiMenus = {
    all: apiRoutes.menus,
    parents: `${apiRoutes.menus}/parent`,
    one: (id: string): string => `${apiRoutes.menus}/${id}`,
};

const routeAdminPageMenus = {
    all: pagesRoutes.menus,
    create: `${pagesRoutes.menus}/create`,
    edit: (id: string): string => `${pagesRoutes.menus}/${id}/edit`,
};

const routeAdminApiFaqs = {
    all: apiRoutes.faqs,
    pageBuilder: `${apiRoutes.faqs}/pageBuilder`,
    one: (id: string): string => `${apiRoutes.faqs}/${id}`,
};

const routeAdminPageFaqs = {
    all: pagesRoutes.faqs,
    create: `${pagesRoutes.faqs}/create`,
    edit: (id: string): string => `${pagesRoutes.faqs}/${id}/edit`,
};

const routeAdminApiCategoryCards = {
    all: apiRoutes.categoryCards,
    pageBuilder: `${apiRoutes.categoryCards}/pageBuilder`,
    one: (id: string): string => `${apiRoutes.categoryCards}/${id}`,
};

const routeAdminPageCategoryCards = {
    all: pagesRoutes.categoryCards,
    create: `${pagesRoutes.categoryCards}/create`,
    edit: (id: string): string => `${pagesRoutes.categoryCards}/${id}/edit`,
};

const routeAdminApiIconCards = {
    all: apiRoutes.iconCards,
    select: `${apiRoutes.iconCards}/select`,
    one: (id: string): string => `${apiRoutes.iconCards}/${id}`,
};

const routeAdminPageIconCards = {
    all: pagesRoutes.iconCards,
    create: `${pagesRoutes.iconCards}/create`,
    edit: (id: string): string => `${pagesRoutes.iconCards}/${id}/edit`,
}

const routeAdminApiIconCardImages = {
    all: apiRoutes.iconCardImages,
    one: (id: string): string => `${apiRoutes.iconCardImages}/${id}`,
};

const routeAdminPageIconCardImages = {
    all: pagesRoutes.iconCardImages,
    create: `${pagesRoutes.iconCardImages}/create`,
    edit: (id: string): string => `${pagesRoutes.iconCardImages}/${id}/edit`,
};

const routeAdminApiCards = {
    all: apiRoutes.cards,
    oneCard: (id: string): string => `${apiRoutes.cards}/card/${id}`,
    oneCart: (id: string): string => `${apiRoutes.cards}/cart/${id}`,
};

const routeAdminPageCards = {
    all: pagesRoutes.cards,
    create: `${pagesRoutes.cards}/create`,
    editCard: (id: string): string => `${pagesRoutes.cards}/card/${id}/edit`,
    editCart: (id: string): string => `${pagesRoutes.cards}/cart/${id}/edit`,
    card: `${pagesRoutes.cards}/card`,
    cart: `${pagesRoutes.cards}/cart`,
};

export {
    routeAdminApiBuilders,
    routeAdminApiIconCardImages, routeAdminPageIconCardImages,
    routeAdminApiIconCards, routeAdminPageIconCards,
    routeAdminApiCategoryCards, routeAdminPageCategoryCards,
    routeAdminApiFaqs, routeAdminPageFaqs,
    routeAdminApiMenus, routeAdminPageMenus,
    routeAdminApiOptions, routeAdminPageOptions,
    routeAdminApiCasinos, routeAdminPageCasinos,
    routeAdminApiCasinoOptions, routeAdminPageCasinoOptions,
    routeAdminApiPages, routeAdminPagePages,
    routeAdminApiSettings, routeAdminPageSettings,
    routeAdminPageUsers, routeAdminApiUsers,
    routeAdminApiCards, routeAdminPageCards,
};
