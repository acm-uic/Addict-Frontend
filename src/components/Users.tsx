import React, { useState } from "react";

type UsersProp = {
    users: string
}

export class Users extends React.Component<UsersProp> {
    render(): React.ReactNode {
        return (
            <div>
                <p>{this.props.users}</p>
            </div>
            
        )
    }
}