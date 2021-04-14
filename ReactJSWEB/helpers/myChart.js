import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
    curveCatmullRom,
    line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

// import { energyConsumption as data } from '../../../demo-data/data-vizualization';

const Line = props => (
    <LineSeries.Path
        {...props}
        path={line()
            .x(({ arg }) => arg)
            .y(({ val }) => val)
            .curve(curveCatmullRom)}
    />
);

const titleStyles = {
    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: '10px',
    },
};
const Text = withStyles(titleStyles)((props) => {
    const { text, classes } = props;
    const [mainText, subText] = text.split('\\n');
    return (
        <div className={classes.title}>
            <Typography component="h3" variant="h5">
                Leads for the past 7 days
            </Typography>
        </div>
    );
});

const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendLabelStyles = theme => ({
    label: {
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap',
    },
});
const legendItemStyles = () => ({
    item: {
        flexDirection: 'column-reverse',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
    chart: {
        paddingRight: '30px',
    },
});

class MyChart extends React.PureComponent {
    constructor(props) {
        super(props);

        console.log(props.data);

        this.state = {
            data: props.data,
        };
    }

    render() {
        // const { data: chartData } = this.state;
        const { classes, data: chartData ,clr } = this.props;

        return (
            <Paper
                style={{backgroundColor:"rgba(255, 255, 255, 0)", color:clr}}>
                <Chart
                    data={chartData}
                    className={classes.chart}
                >
                    <ArgumentScale factory={scalePoint}/>
                    {/*<ArgumentAxis color={"#fff"}/>*/}
                    <ArgumentAxis> {/* or ValueAxis, or CommonAxisSettings */}
                        <Label
                            staggeringSpacing={10}
                            displayMode="stagger"
                        />
                    </ArgumentAxis>
                    <ValueAxis />

                    <LineSeries
                        name="Wins"
                        valueField="wins"
                        argumentField="date"
                        seriesComponent={Line}

                    />
                    <LineSeries
                        name="Loss"
                        valueField="loss"
                        argumentField="date"
                        seriesComponent={Line}
                    />
                    <LineSeries
                        name="New"
                        valueField="new"
                        argumentField="date"
                        seriesComponent={Line}
                    />
                    <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} color={"#fff"}/>
                    <Title
                        text="Leads in the last 7 days"
                        textComponent={Text}
                    />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(MyChart);