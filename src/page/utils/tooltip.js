import * as d3 from 'd3'

class ToolTip {
    constructor() {
        this.toolTip = this.createToolTip()
        console.log(33, this.toolTip)
    }

    createToolTip () {
        return d3.select('body')
            .append('div')
            .classed('tooltip', true)
            .style('opacity', 0)
            .style('display', 'none')
    }

    show (textContent) {
        this.toolTip.transition()
            .duration(400)
            .style('opacity', 0.9)
            .style('display', 'block');
        this.toolTip.html(textContent)
            .style('left', (d3.event.pageX + 15) + 'px')
            .style('top', (d3.event.pageY - 15) + 'px')
            .style('font-size', '14px')
            .style('text-align', 'left')
    }

    hide () {
        this.toolTip.transition()
            .duration(400)
            .style('opacity', 0)
            .style('display', 'none');
    }

}

export default new ToolTip()