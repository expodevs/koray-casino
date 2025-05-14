
const apiRoutes = {
    builders: '/api/admin/builders',
    users: '/api/admin/users',
    settings: '/api/admin/settings',
    pages: '/api/admin/pages',
    options: '/api/admin/options',
    menus: '/api/admin/menus',
    faqs: '/api/admin/faqs',
    categoryCards: '/api/admin/categoryCards',
    iconCards: '/api/admin/iconCards',
    iconCardImages: '/api/admin/iconCardImages',
};

const pagesRoutes = {
    users: '/admin/users',
    settings: '/admin/settings',
    pages: '/admin/pages',
    options: '/admin/options',
    menus: '/admin/menus',
    faqs: '/admin/faqs',
    categoryCards: '/admin/categoryCards',
    iconCards: '/admin/iconCards',
    iconCardImages: '/admin/iconCardImages',
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

export {
    routeAdminApiBuilders,
    routeAdminApiIconCardImages, routeAdminPageIconCardImages,
    routeAdminApiIconCards, routeAdminPageIconCards,
    routeAdminApiCategoryCards, routeAdminPageCategoryCards,
    routeAdminApiFaqs, routeAdminPageFaqs,
    routeAdminApiMenus, routeAdminPageMenus,
    routeAdminApiOptions, routeAdminPageOptions,
    routeAdminApiPages, routeAdminPagePages,
    routeAdminApiSettings, routeAdminPageSettings,
    routeAdminPageUsers, routeAdminApiUsers,
};
