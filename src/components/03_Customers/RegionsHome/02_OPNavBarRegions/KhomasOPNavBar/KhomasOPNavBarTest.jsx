perfect, but I need<Route path="/LP/Khomas/Towns" element={<KhomasTowns />} /> to be the main route for the modal, and if a user navigates back using the browser back/return button to the routes before the <Route path="/LP/Khomas/Towns" element={<KhomasTowns />} /> route, the selected modal should clear unless the user navigates forward to routes that are below this <Route path="/LP/Khomas/Towns" element={<KhomasTowns />} />route