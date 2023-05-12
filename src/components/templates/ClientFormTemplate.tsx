import React, { FunctionComponent } from 'react';
import { Form, FormInstance } from '../atoms';
import { ProtectionFragment } from '../constants';
import { OwnershipCardNonEditablePercentage, FormActions } from '../molecules';
import { FormContextProvider } from '../providers';
import { Layout } from '../atoms';
import "./ClientFormTemplate.css";

export interface ClientFormTemplateProps{
  id: string;
  form: FormInstance;
  onSubmit:(values: any) => void;
  initialValues?: ProtectionFragment;
  scenarioValues?: ProtectionFragment;
  baselineValues?: ProtectionFragment;
  children?: React.ReactNode;
}

export const ClientFormTemplate: FunctionComponent<ClientFormTemplateProps> = ({
    id,
    form,
    onSubmit,
    initialValues,
    scenarioValues,
    baselineValues,
    children
})=>{
    const {Header, Footer, Content, Sider} = Layout;
    return(
    <FormContextProvider value={{...form, initialValues, baselineValues, scenarioValues}}>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>
          <Form
              id={id}
              form={form}
              initialValues={initialValues} 
              onSubmit={onSubmit}
          >
              {children} 
          </Form>
        </Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    </FormContextProvider>)
}