function autorizarRoles(...rolesPermitidos) {
    return (req, res, next) => {
        
        const usuario = req.user;
        // si no hay usuario
        if(!usuario) return res.status(401).json({ message: 'No autorizado' });
        // si el rol del usuario no esta incluido en los roles permitidos
        if(!rolesPermitidos.includes(usuario.rol)) return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
        next();
    };
}

module.exports = { autorizarRoles };