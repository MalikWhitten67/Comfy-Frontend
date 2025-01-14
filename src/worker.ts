import api from "./api";
self.addEventListener('message', async (event) => {
    const { type, payload } = event.data; 
    switch (type) { 
        case 'saveCart':
            self.postMessage({type, payload})  
            if(!payload.owner){
                self.postMessage({error: "No owner specified"})
                return
            } 
            try{}
            
            self.postMessage(api.authStore.record);
            

    }
});