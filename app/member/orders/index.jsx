import SharedComponent from "../../../src/Components/SharedComponent";
import api from "../../../src/api";
export default function(){
    useEffect(() => {
        if(api.authStore.isValid === false){
            window.location.href = '/auth/login'
        }
    }, [])
    return (
        <SharedComponent title="Comfy - Member Orders">
        </SharedComponent>
    )
}