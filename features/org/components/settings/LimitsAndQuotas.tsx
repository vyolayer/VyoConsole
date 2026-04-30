export const LimitsAndQuotas = ({
    max_members,
    max_projects,
}: {
    max_members: number;
    max_projects: number;
}) => {
    return (
        <div className="bg-[#141418] rounded-2xl p-8 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[#7b7b86] uppercase tracking-wider">Quotas</h2>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Max Members", value: max_members },
                    { label: "Max Projects", value: max_projects },
                ].map((q) => (
                    <div key={q.label} className="bg-[#0f1930] rounded-xl p-4">
                        <p className="text-[11px] font-bold text-[#7b7b86] uppercase tracking-wider mb-1">
                            {q.label}
                        </p>
                        <p className="text-2xl font-bold text-white">{q.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
