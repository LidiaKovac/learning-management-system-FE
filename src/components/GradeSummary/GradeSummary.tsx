import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

const GradeSummary:React.FC = () => {
	return (
		<LineChart
			width={350}
			height={200}
			className="grade__wrap"
			//data={}
		>
			<Line />
			<CartesianGrid />
			<XAxis dataKey="name" />
			<YAxis />
		</LineChart>
	)
}

export default GradeSummary
