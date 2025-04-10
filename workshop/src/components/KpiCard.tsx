const KpiCard = ({
    title, 
    content, 
    desc
}: { title: string; content: string | number; desc: string  }) => {
    return (
        <div className="stats shadow">
        <div className="stat">
            <div className="stat-title">{title}</div>
            <div className="stat-value">{content}</div>
            <div className="stat-desc">{desc}</div>
        </div>
        </div>
    )
}

export default KpiCard;