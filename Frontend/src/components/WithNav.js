import React from 'react';
import NavBar from './NavigationBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import ChatBotApp from './chatbot';
import MinimizableWebChat from '../minWebChat/MinimizableWebChat';
import '../minWebChat/MinimizableWebChat.css'

export default () => {
  return (
    <>
      <NavBar />
      <MinimizableWebChat />
      <Outlet />
      
      {/* <ChatBotApp /> */}
      <Footer />
    </>
  );
};
