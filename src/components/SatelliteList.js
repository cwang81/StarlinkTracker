import React, { Component } from "react";
import { List, Avatar, Button, Checkbox, Spin } from "antd";

import satLogo from '../assets/images/satellite.svg';

class SatelliteList extends Component {

    state = {
        selected: [],
        isLoad: false
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        type="primary"
                        size="large"
                        onClick={ this.onShowSatOnMap }>
                    Track on the map
                </Button>
                <hr/>
                {
                    isLoad ? (
                            <div className="spin-box">
                                <Spin tip="Loading..." size="large"/>
                            </div>
                        ) :
                        (<List className="sat-list"
                               itemLayout="horizontal"
                               dataSource={satList}
                               renderItem={
                                   item =>
                                       <List.Item
                                           actions={[
                                               <Checkbox dataInfo={item} onChange={this.onChange}/>
                                           ]}>
                                           <List.Item.Meta
                                               avatar={<Avatar
                                                   size={48}
                                                   src={satLogo}/>}
                                               title={<p>{item.satname}</p>}
                                               description={`Launch Date: ${item.launchDate}`}
                                           />
                                       </List.Item>}
                        />)
                }
            </div>
        );
    }

    onShowSatOnMap = () => {
        this.props.onShowMap(this.state.selected);
    }

    onChange = e => {
        // step 1: get current selected sat info
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;

        // step 2: add or remove current selected sat to/from selectred array
        const list = this.addOrRemove(dataInfo, checked, selected);

        console.log('list -> ', list);

        // step 3: update selected state
        this.setState( {
            selected: list
        })
    }

    addOrRemove = (item, status, list) => {
        // case 1. check is true
        //          -> item not in the list => add item
        //          -> item is in the list => do nothing

        // case 2: check is false
        //          -> item is in the list => remove the item
        //          -> item not in the list => do nothing

        const found = list.some( entry => entry.satid === item.satid );

        console.log('found -> ', found);

        if (status && !found) {
            list = [...list, item];
            // list.push(item);
        }

        if (!status && found) {
            list = list.filter( entry => entry.satid !== item.satid );
        }

        return list;
    }

}

export default SatelliteList;