import {Typography as AntDesignTypography, Typography} from 'antd';
import React from 'react';

interface TypographyChildComponents {
    Title: typeof AntDesignTypography.Title,
    Text: typeof AntDesignTypography.Text
}

export const MalipsTypography: React.FC & TypographyChildComponents=()=>(<></>);

MalipsTypography.Title = Typography.Title;
MalipsTypography.Text = Typography.Text;
