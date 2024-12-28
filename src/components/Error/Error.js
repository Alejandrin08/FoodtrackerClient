import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Error = () => {
    return (
        <div >
            <Row>
                <Col className="text-center mt-5">
                    <h1 className='mt-5'>Ha ocurrido un error inesperado</h1>
                    <img src="https://th.bing.com/th/id/R.edac5fb6f6b928cd012f0e9666d17df3?rik=N9YMHU39ox3Jkg&riu=http%3a%2f%2fdev.b2c.tourvisio.com%2fcms%2fDefaultSanTSG%2fb2cImages%2fB2C_San_Default_images%2fError+Images%2f404.png&ehk=k5fPZXjFfi3UfzKil0fcVVM1gCGtSl7MIHWzugigUcY%3d&risl=&pid=ImgRaw&r=0" alt="Error" />
                </Col>
            </Row>
        </div>
    );
}

export default Error;