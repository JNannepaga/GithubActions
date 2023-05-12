import { Card as AntDesignCard } from 'antd';
import React from 'react';
import {CardProps as AntDesignCardProps} from 'antd/lib/card';

export interface CardProps extends AntDesignCardProps{
    children: React.ReactNode
}

export interface CompoundedCardComponent {
    Meta: typeof  AntDesignCard.Meta;
}

export const Card: React.FunctionComponent<CardProps> & CompoundedCardComponent = ({
    title,
    children,
    ...props
}) =>{
return (
    <AntDesignCard 
        title = {title}
        {...props}>
            {children}
    </AntDesignCard>)
}

Card.Meta = AntDesignCard.Meta;
