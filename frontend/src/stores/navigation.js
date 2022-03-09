import { defineStore } from "pinia";

export const useNavigation = defineStore("navigation", {
  state: () => {
    return {
        sidebar: false,
        loading: false,
        timeout: null,
        alert: {
            show: false,
            messages: [],
        }
    }
  },

  getters: {},

  actions: {
      setLoading() {
          this.loading = true
          if(this.timeout != null) clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
              alert('Failed')
              this.loading = false;
          }, 30000)
      },
      clearLoading() {
          this.loading = false;
          clearTimeout(this.timeout)
          this.timeout = null;
      },
      addAlert(message) {
          if(!this.alert.show) this.alert.show = true;
          const index = message.length > 1 ? 0 : message.length -1;
          const timeout = setTimeout(() => {
            this.alert.messages.splice(index, 1)
            if(this.alert.messages.length < 1) this.alert.show = false;  
          }, 10000)
          message.timeout = timeout
          this.alert.messages.push(message)
      },
      removeAlert(index) {
          clearTimeout(this.alert.messages[index].timeout);
          this.alert.messages.splice(index, 1)
          if(this.alert.messages.length < 1) this.alert.show = false;
      }
  },
});
