export default function StateCard({title, value} : {title : string, value : number}){
    return(
        <div>
            <p className="text-lg">{title}</p>
            <br />
            <p className="text-2xl">{value}</p>
        </div>
    )
}