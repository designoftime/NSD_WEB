import requests from '../lib/axios';

interface CategoryService {
  getCategoriesDropdown: () => Promise<any>;
  getNurseServicesDropdown: (id: string) => Promise<any>;
}

const categoryService: CategoryService = {
  getCategoriesDropdown: async () => {
    return requests.get('/admin/categories/dropdown');
  },

  getNurseServicesDropdown: async (id: string) => {
    return requests.get(`/nurse/services/dropdown/${id}`);
  },
};

export default categoryService;
