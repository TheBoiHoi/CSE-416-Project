import PublicTabs from './PublicProfile/PublicTabs'
import PublicProfileCard from './PublicProfile/PublicProfileCard'

export const PublicProfile = (props) => {
    
    return(
    <div>
        <div style={{}} class="row align-items-center">
            <br></br>
        </div>
        <div class="row align-items-center">
        <div  align="center" class="col">
            <PublicProfileCard name="testuser"/>
        </div>
        </div>
        <div class="row align-items-center">
        <div   align="center" class="col">
            <PublicTabs></PublicTabs>
        </div>
        </div>
    </div>
    )
}