import { Button as AntDesignButton} from 'antd';
import { ButtonProps as AntDesignButtonProps} from 'antd/lib/button';
import React from 'react';
import { Location } from 'history';
import { Link as RouterLink } from 'react-router-dom';

export interface ButtonProps extends AntDesignButtonProps{
    to?: Location;
    children?: React.ReactNode
}

export const Button: React.FunctionComponent<ButtonProps> = ({
    to,
    type,
    children,
    ...props
}) =>{
    const button = <AntDesignButton type={type} {...props}>
                        {children}
                    </AntDesignButton>;
    return to ? (<RouterLink to={to}>{button}</RouterLink>) : (button)
} 